class App {
  constructor() {
    this.state = null;
  }

  setup() {
    this.state.setup();
  }

  run() {
    this.state.run();
  }

  changeState(state) {
    this.state?.clean();
    this.state = state;
  }
}

export default App;
