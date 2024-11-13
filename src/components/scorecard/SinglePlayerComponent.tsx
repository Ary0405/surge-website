import { SinglePlayerEvent } from "~/types/types";

export const isSinglePlayerEvent = (event: any): event is SinglePlayerEvent => {
    return 'player' in event && 'gold' in event;
};

export const SinglePlayerComponent = ({ match, category }: { match: SinglePlayerEvent[]; category: string }) => {
    return (
        <>
            <div>
                {category}
                {match[0]?.gold}
            </div>
        </>
    )
}