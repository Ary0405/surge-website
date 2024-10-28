import {
	Box,
	Accordion,
	AccordionItem,
	AccordionButton,
	Text,
	Checkbox,
	AccordionIcon,
	AccordionPanel,
	VStack,
	Divider,
	Button,
	Heading,
	Input,
	FormLabel,
	useToast,
} from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";

interface AccommodationProps {
	teamId: string;
	startDate: string;
	endDate: string;
	maleCount: number;
	femaleCount: number;
}

const Accommodation = () => {

	const [accommodation, setAccommodation] = useState<AccommodationProps[]>([]);
	const [selectedAccommodation, setSelectedAccommodation] = useState<string[]>([]);
	const toast = useToast();

	const {
		data: teams,
		isLoading,
		isError,
		refetch,
	} = api.reg.getAccomodationTeams.useQuery();

	useEffect(() => {
		if (teams) {
			const initialAccommodation = teams.map((team) => ({
				teamId: team.id,
				startDate: team.AccommodationDetails?.startDate ?? '',
				endDate: team.AccommodationDetails?.endDate ?? '',
				maleCount: team.AccommodationDetails?.maleCount ?? 0,
				femaleCount: team.AccommodationDetails?.femaleCount ?? 0,
			}));
			setAccommodation(initialAccommodation);
		}
	}, [teams]);


	const saveAccom = api.reg.saveAccommodationDetails.useMutation();


	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error...</div>;
	}

	if (!teams) {
		return <div>No data...</div>;
	}


	const handleSelectTeam = (id: string) => {
		if (selectedAccommodation.includes(id)) {
			setSelectedAccommodation((prev) => prev.filter((teamId) => teamId !== id));
		} else {
			setSelectedAccommodation((prev) => [...prev, id]);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, id, type } = e.target;
		setAccommodation((prevAccommodation) => {
			const index = prevAccommodation.findIndex((acc) => acc.teamId === id);
			if (index === -1) {
				return [
					...prevAccommodation,
					{
						teamId: id,
						startDate: '',
						endDate: '',
						maleCount: 0,
						femaleCount: 0,
						[name]: type === 'number' ? parseInt(value) : value,
					},
				];
			} else {
				const updatedAccommodation = [...prevAccommodation];
				updatedAccommodation[index] = {
					...updatedAccommodation[index],
					[name]: type === 'number' ? parseInt(value) : value,
				};
				return updatedAccommodation;
			}
		});
	};

	const fieldDisabled = (category: string, field: string) => {
		return category === field ? true : category === "MIXED" ? true : false;
	}

	const handleSaveOrUpdate = async (teamId: string, isUpdate: boolean, count: number) => {

		const data = accommodation.find((acc) => acc.teamId === teamId);

		if (!data) {
			toast({
				title: "Enter accommodation details",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		const { startDate, endDate, maleCount, femaleCount } = data;

		const accomId = teams.find((team) => team.id === teamId)?.AccommodationDetails?.id;

		if (!startDate || !endDate || (maleCount === 0 && femaleCount === 0)) {
			toast({
				title: "Enter all details",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (startDate === endDate) {
			toast({
				title: "Start and end date cannot be the same",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (startDate > endDate) {
			toast({
				title: "Start date cannot be greater than end date",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (maleCount + femaleCount > count) {
			toast({
				title: "Number of beds exceed team size",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const payload = {
			teamId,
			startDate,
			endDate,
			maleCount,
			femaleCount,
			isUpdate,
			accomId
		};

		try {
			await saveAccom.mutateAsync(payload);
			toast({
				title: "Accommodation details saved",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error saving accommodation details",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}

		await refetch();
	}

	const rates = {
		1: 500,
		2: 800,
		3: 1000,
	};

	const calculateDays = (startDate: string, endDate: string) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	const calculateTotal = (data: AccommodationProps) => {
		const days = calculateDays(data.startDate, data.endDate) as 1 | 2 | 3;
		const maleTotal = data.maleCount * rates[days];
		const femaleTotal = data.femaleCount * rates[days];
		return maleTotal + femaleTotal;
	}

	const selectedTeams = teams.filter((team) => selectedAccommodation.includes(team.id));
	const total = selectedTeams.reduce((acc, team) => {
		const data = accommodation.find((acc) => acc.teamId === team.id);
		if (!data) return 0;
		return acc + calculateTotal(data);
	}, 0);

	const handleCheckout = async () => {
		if (selectedAccommodation.length === 0) {
			toast({
				title: "Select a team to checkout",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
	}

	return (
		<Layout>
			<Box maxW="4xl" mx="auto" py={8} px={6}>
				<Heading as="h1" size="2xl" mb={8} color="#F4AC18">
					Accommodation
				</Heading>
				{teams.length === 0 ? (
					<Text fontSize="lg">No Teams verified yet</Text>
				) : (
					<Accordion allowToggle>
						{teams.map((team) => (
							<div key={team.id}>
								<AccordionItem key={team.id}>
									<AccordionButton>
										<Box
											flex="1"
											textAlign="left"
											fontSize="xl"
											color="#F4AC18"
											display="flex"
											alignItems="center"
										>
											<Checkbox
												colorScheme="yellow"
												color="white"
												border={"0.2px white"}
												size="lg"
												isChecked={selectedAccommodation.includes(team.id)}
												onChange={() => handleSelectTeam(team.id)}
												borderRadius={"10px"}
												marginRight={2}
											/>
											{team.Event.name}
										</Box>
										<AccordionIcon />
									</AccordionButton>
									<AccordionPanel pb={4}>
										<VStack align="start" spacing={4}>
											<FormLabel>Start Date</FormLabel>
											<Input
												type="date"
												placeholder="Start Date"
												name="startDate"
												id={team.id}
												min="2024-11-14"
												max="2024-11-17"
												defaultValue={team.AccommodationDetails?.startDate}
												onChange={handleInputChange}
											/>

											<FormLabel>End Date</FormLabel>
											<Input
												type="date"
												placeholder="End Date"
												name="endDate"
												min="2024-11-14"
												max="2024-11-17"
												id={team.id}
												defaultValue={team.AccommodationDetails?.endDate}
												onChange={handleInputChange}
											/>
											{fieldDisabled(team.Event.category, "MALE") ? (
												<>
													<FormLabel>Male Beds</FormLabel>
													<Input
														type="number"
														placeholder="Number of male beds"
														name="maleCount"
														id={team.id}
														defaultValue={team.AccommodationDetails?.maleCount}
														onChange={handleInputChange}
													/>
												</>
											) : null}
											{fieldDisabled(team.Event.category, "FEMALE") ? (
												<>
													<FormLabel>Female Beds</FormLabel>
													<Input
														type="number"
														placeholder="Number of Female beds"
														name="femaleCount"
														id={team.id}
														defaultValue={team.AccommodationDetails?.femaleCount}
														onChange={handleInputChange}
													/>
												</>
											) : null}
											<Divider mt={4} />
											<Button
												colorScheme="red"
												size="sm"
												onClick={() => handleSaveOrUpdate(
													team.id,
													team.AccommodationDetails ? true : false,
													team._count.TeamMembers
												)}
											>
												{team.AccommodationDetails ? "Update" : "Save"}
											</Button>
										</VStack>
									</AccordionPanel>
								</AccordionItem>
							</div>
						))}
						<br />
						<br />
					</Accordion>
				)}
				<Box mt={8}
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text fontSize="xl" mt={8}>
						Total: {total}
					</Text>
					<Button
						colorScheme="red"
						size="lg"
						onClick={handleCheckout}
						isDisabled={selectedAccommodation.length === 0}
					>
						Checkout
					</Button>
				</Box>
			</Box>
		</Layout>
	)
}

export default Accommodation