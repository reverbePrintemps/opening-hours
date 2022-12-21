import { OpeningHours } from "./components/OpeningHours/OpeningHours";
import { Box, Card, Skeleton } from "@mui/material";
import { useOpeningHours } from "./api/data-hooks";
import { styles } from "./styles/App";

function App() {
  // In a real world scenario, the Shop ID would come from a parent component such as a Shop page
  const openingHours = useOpeningHours(89367946398743);

  return (
    <main>
      <section>
        {openingHours ? (
          <Box style={styles.container}>
            <Card style={styles.card} tabIndex={0}>
              <OpeningHours openingHours={openingHours} />
            </Card>
          </Box>
        ) : (
          <Skeleton />
        )}
      </section>
    </main>
  );
}

export default App;
