import { ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import ButtonAtom from '../atoms/button';
import CardAtom from '../atoms/card';
import { Title, Text } from '../atoms/typography';
import FlexAtom from '../atoms/flex';
import { Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import '../../styles/errorboundary.css'; // Import the CSS file

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({
        error,
        componentStack,
        resetError,
      }: {
        error: unknown;
        componentStack: string;
        resetError: () => void;
      }) => {
        const errorMessage =
          error instanceof Error
            ? error.toString()
            : 'An unknown error occurred';
        return (
          <FlexAtom
            justify="center"
            align="center"
            className="error-boundary-container"
          >
            <CardAtom className="error-boundary-card">
              <Space
                direction="vertical"
                size="large"
                className="error-boundary-space"
              >
                <Title level={2} className="error-boundary-title">
                  Oops! Something Went Wrong
                </Title>
                <Text type="secondary" className="error-boundary-message">
                  {errorMessage}
                </Text>
                <div className="error-boundary-stack-container">
                  <Text type="secondary" className="error-boundary-stack">
                    {componentStack}
                  </Text>
                </div>
                <ButtonAtom
                  type="primary"
                  size="large"
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    resetError();
                    window.location.reload();
                  }}
                >
                  Reload Page
                </ButtonAtom>
              </Space>
            </CardAtom>
          </FlexAtom>
        );
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default Sentry.withErrorBoundary(ErrorBoundary, {
  fallback: <p>An error occurred. Please try again later.</p>,
});
