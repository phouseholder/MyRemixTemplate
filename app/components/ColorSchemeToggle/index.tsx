import {
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      fullWidth
      color="red"
      onClick={toggleColorScheme}
      leftSection={
        computedColorScheme === "light" ? (
          <IconMoon size="1rem" stroke={1.5} />
        ) : (
          <IconSun size="1rem" stroke={1.5} />
        )
      }
    >
      {computedColorScheme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ColorSchemeToggle;
