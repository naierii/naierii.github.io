module.exports = {
  prompt: ({ inquirer }) => {

    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the component name?',
      }
    ];

    return inquirer.prompt({
      type: 'select',
      name: 'category',
      message: 'Component type?',
      choices: ['ui', 'layout', 'nav', 'util', 'icon', 'skeleton', 'other'],
    }).then((answers) => {
      const { category } = answers;
      if (category === 'other') {
        return inquirer.prompt([{
          type: 'input',
          name: 'category',
          message: 'Enter component type?',
        }, ...questions]).then(extraAnswers => ({ ...answers, ...extraAnswers }));
      } else {
        return inquirer.prompt(questions).then(extraAnswers => ({ ...answers, ...extraAnswers }));
      }
    }).then((answers) => {
      const { category, component_name } = answers;
      const path = `components/${category}/${component_name}`;
      const absPath = `${path}`;
      return { ...answers, path, absPath, category };
    });
  },
};
