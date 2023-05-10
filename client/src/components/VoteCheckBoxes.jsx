import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useGetVotesQuery } from "state/api";

export default function VoteCheckboxes({ billId }) {
  const { data: votes, isLoading: isVotesLoading } = useGetVotesQuery({
    billId: JSON.stringify(billId),
  });

  if (isVotesLoading) {
    return <p>Loading...</p>;
  }

  if (!votes) {
    return <p>No votes found.</p>;
  }

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {/* {votes.map((vote) => (
          <FormControlLabel
            key={vote.vote_id}
            control={<Checkbox />}
            label={vote.vote_title}
          />
        ))} */}
      </FormGroup>
    </FormControl>
  );
}
