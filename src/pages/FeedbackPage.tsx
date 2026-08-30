import { useState, type ReactNode } from 'react';
import {
  Alert,
  Button,
  Title,
  Text,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  Form,
  FormGroup,
  TextInput,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  ProgressStep,
  ProgressStepper,
} from '@patternfly/react-core';
import { useMutation } from '@tanstack/react-query';
import { CubesIcon } from '@patternfly/react-icons';

const DEMO_REQUEST_DELAY_MS = 1500;

/**
 * Fixed patterns:
 * - feedback/missing-loading-state
 * - feedback/missing-empty-state
 * - feedback/missing-success-feedback
 * - feedback/no-progress-indicator
 */
export function FeedbackPage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Feedback
      </Title>
      <Text component="p">Loading, empty, success, and progress indicators are provided.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <LoadingStateDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <EmptyStateDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <CreateItemDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <ProgressIndicatorDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function LoadingStateDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, DEMO_REQUEST_DELAY_MS));
      await fetch('/api/save', { method: 'POST' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle>missing-loading-state (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={isLoading}
          isDisabled={isLoading}
          spinnerAriaValueText="Saving changes"
        >
          Save changes
        </Button>
        {isLoading && <Text component="p">Saving your changes…</Text>}
      </CardBody>
    </Card>
  );
}

function EmptyStateDemo() {
  const items: { id: string; name: string }[] = [];

  return (
    <Card>
      <CardTitle>missing-empty-state (fixed)</CardTitle>
      <CardBody>
        {items.length === 0 ? (
          <EmptyState variant="sm">
            <EmptyStateHeader
              titleText="No team items yet"
              icon={<EmptyStateIcon icon={CubesIcon} />}
            />
            <EmptyStateBody>
              <Text component="p">Team items you create will appear here.</Text>
            </EmptyStateBody>
          </EmptyState>
        ) : (
          <DataList aria-label="Team items" items={items} />
        )}
      </CardBody>
    </Card>
  );
}

function DataList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function CreateItemDemo() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      await new Promise((resolve) => setTimeout(resolve, DEMO_REQUEST_DELAY_MS));
      const res = await fetch('/api/items', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      setSuccessMessage('Item created successfully.');
      console.log('toast.success: Item created');
    },
  });

  return (
    <Card>
      <CardTitle>missing-success-feedback (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {successMessage && (
          <Alert
            variant="success"
            title="Success"
            isInline
            timeout={4000}
            onTimeout={() => setSuccessMessage(null)}
          >
            {successMessage}
          </Alert>
        )}
        <Button
          variant="primary"
          isLoading={mutation.isPending}
          isDisabled={mutation.isPending}
          spinnerAriaValueText="Creating item"
          onClick={() => mutation.mutate({ name: 'demo' })}
        >
          Create item
        </Button>
        {mutation.isPending && <Text component="p">Creating item…</Text>}
      </CardBody>
    </Card>
  );
}

function ProgressIndicatorDemo() {
  return (
    <Card>
      <CardTitle>no-progress-indicator (fixed)</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ProgressStepper aria-label="Organization setup progress">
          <ProgressStep variant="success" aria-label="Step 1 complete">
            Account
          </ProgressStep>
          <ProgressStep isCurrent aria-label="Step 2 current">
            Organization
          </ProgressStep>
          <ProgressStep variant="pending" aria-label="Step 3 pending">
            Review
          </ProgressStep>
        </ProgressStepper>
        <WizardStep step={2}>
          <Form>
            <FormGroup label="Organization name" fieldId="org-name">
              <TextInput id="org-name" />
            </FormGroup>
            <FormGroup label="Admin email" fieldId="admin-email">
              <TextInput id="admin-email" type="email" />
            </FormGroup>
          </Form>
        </WizardStep>
      </CardBody>
    </Card>
  );
}

function WizardStep({ children }: { step: number; children: ReactNode }) {
  return <div>{children}</div>;
}
