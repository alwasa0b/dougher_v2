import { useState } from "react";

import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import useStore from "./store";

interface MainProps {
  renderSelector: () => JSX.Element;
}

export default function DoughSelector(): JSX.Element {
  const selected = useStore((state) => state.index);
  const setSelected = useStore((state) => state.select);
  const ingredientList = useStore((state) => state.recipes);

  const newLocal = () => (
    <Select
      fullWidth
      variant="standard"
      value={selected}
      label="Age"
      onChange={({ target }) => {
        setSelected(Number(target.value));
      }}
    >
      {ingredientList.map((i, index) => (
        <MenuItem key={i.name} value={index}>
          {i.name}
        </MenuItem>
      ))}
    </Select>
  );
  return selected !== 0 ? (
    <OldDoughSelector renderSelector={newLocal} />
  ) : (
    <NewDoughSelector renderSelector={newLocal} />
  );
}

const OldDoughSelector = ({ renderSelector }: MainProps): JSX.Element => {
  const save = useStore((state) => state.save);
  const cancel = useStore((state) => state.cancel);

  return (
    <Stack direction={"row"} spacing={2} sx={{ pb: 2 }}>
      {renderSelector()}
      <Box>
        <Stack direction={"row"} sx={{ mt: 1 }}>
          <IconButton size="small" onClick={save}>
            <SaveIcon />
          </IconButton>

          <IconButton size="small" onClick={cancel}>
            <CancelIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};

const NewDoughSelector = ({ renderSelector }: MainProps): JSX.Element => {
  const [saving, setSaving] = useState(false);
  const save = useStore((state) => state.save);
  const cancel = useStore((state) => state.cancel);
  const setName = useStore((state) => state.setName);

  return (
    <Stack direction={"row"} spacing={2} sx={{ pb: 2 }}>
      {saving && (
        <TextField
          onChange={({ target }) => setName(target.value)}
          focused={true}
        />
      )}
      {!saving && renderSelector()}
      <Box>
        <Stack direction={"row"} sx={{ mt: 1 }}>
          {saving && (
            <IconButton
              size="small"
              onClick={() => {
                setSaving(false);
                save();
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
          {!saving && (
            <IconButton
              size="small"
              onClick={() => {
                setSaving(true);
              }}
            >
              <SaveIcon />
            </IconButton>
          )}

          <IconButton
            size="small"
            onClick={() => {
              setSaving(false);
              cancel();
            }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};
