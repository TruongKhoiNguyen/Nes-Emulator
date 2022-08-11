import App from "./scripts/app.js";
import BootupState from "./scripts/bootup-state.js";

const app = new App();
const bootupState = new BootupState(app);
app.changeState(bootupState);

app.setup();
app.run();