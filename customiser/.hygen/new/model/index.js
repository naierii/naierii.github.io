module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'model_name',
        message: 'What is the model name?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const absPath = `src/models`;
      return { ...answers, absPath };
    });
  },
};
