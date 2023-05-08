import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { languageActions } from "../../redux/languageSlice";

const LanguageSelector = () => {
  const language = useAppSelector((state) => state.language.language)

  const dispatch = useAppDispatch();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    dispatch(languageActions.handleLanguageChange(event.target.value));
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 1, minWidth: "120px" }}>
      <FormControl color="primary" fullWidth>
        <InputLabel id="language-select" sx={{ color: "white" }}>
          {t("language")}
        </InputLabel>
        <Select
          color="primary"
          value={language}
          label="language"
          onChange={handleLanguageChange}
          labelId="language-select"
        >
          <MenuItem value={"en"}>{t("english")}</MenuItem>
          <MenuItem value={"pl"}>{t("polish")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default LanguageSelector;
