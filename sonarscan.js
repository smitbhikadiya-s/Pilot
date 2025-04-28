import { customScanner } from '@sonar/scan';

customScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: '',
    options: {
      'sonar.projectKey': 'react-pilot-test',
      'sonar.projectName': 'React-Pilot-Test',
      'sonar.projectVersion': '1.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.test.js,**/*.test.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit(),
);
