class Contents extends KJSComponent {
  exercises;
  projects;

  constructor({ exercises, projects }: { exercises: Record<string, string>, projects: Record<string, string> }) {
    super();

    this.exercises = exercises;
    this.projects = projects;

    this.writeComponent();
  }

  styles = {
    container: `margin-top: 3vh;`,

    stuff: ``,
    
    snakeImage: ``,
  };

  get html() {
    return /*html*/ `
          <div class="${this.styles.container} container">

            ${this.exercises ? `
            <div class="col">
              <h2>EXERCISES</h2>
              <ol>
                ${_.map(this.exercises, (value: string, index: number) => {
                  return `<li><a href="./pages/${index}.html">${value}</a></li>`
                }).join('')}
              </ol>
            </div>
            ` : ''}

            ${this.projects ? `
              <div class="col">
                <h2>PROJECTS</h2>
                <ol>
                  ${_.map(this.projects, (value: string, index: number) => {
                    return `<li><a href="./pages/project_${index + 1}.html">${value}</a></li>`
                  }).join('')}
                </ol>
              </div>` : ''}

          </div>
        `;
  }
}

/*

            <div class="row">
              <div class="col-lg-6 d-flex justify-content-center d-flex flex-column">
                <img src="./Assets/python-ladder-snake.png" class="${this.styles.snakeImage} img-fluid" />
                <h1 class="d-flex-auto text-center"> PYTHON LADDER </h1>
              </div>

*/