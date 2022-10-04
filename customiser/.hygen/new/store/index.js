module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'store_name',
        message: 'What is the store name?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const absPath = `store`;
      return { ...answers, absPath };
    });
  },
};
