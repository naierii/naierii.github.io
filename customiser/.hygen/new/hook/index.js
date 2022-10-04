module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'hook_name',
        message: 'What is the hook name?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const absPath = `src/hooks`;
      return { ...answers, absPath };
    });
  },
};
