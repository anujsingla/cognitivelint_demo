import { useState, type ReactNode } from 'react';
import {
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
  Spinner,
} from '@patternfly/react-core';
import { useMutation } from '@tanstack/react-query';

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
    await fetch('/api/save', { method: 'POST' });
    setIsLoading(false);
  };

  return (
    <Card>
      <CardTitle>missing-loading-state (fixed)</CardTitle>
      <CardBody>
        {isLoading && <Spinner aria-label="Saving changes" />}
        <Button variant="primary" onClick={handleSave} isDisabled={isLoading}>
          Save changes
        </Button>
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
          <EmptyState message="No team items yet" />
        ) : (
          <DataList aria-label="Team items" items={items} />
        )}
      </CardBody>
    </Card>
  );
}

function DataList({ items }: { items: { id: string; name: string }[] }) {
  if (items.length === 0) {
    return <EmptyState message="No team items yet" />;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p>{message}</p>;
}

function CreateItemDemo() {
  const mutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const res = await fetch('/api/items', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      console.log('toast.success: Item created');
    },
  });

  return (
    <Card>
      <CardTitle>missing-success-feedback (fixed)</CardTitle>
      <CardBody>
        {mutation.isPending && <Spinner aria-label="Creating item" />}
        <Button
          variant="primary"
          isDisabled={mutation.isPending}
          onClick={() => mutation.mutate({ name: 'demo' })}
        >
          Create item
        </Button>
      </CardBody>
    </Card>
  );
}

function ProgressIndicatorDemo() {
  return (
    <Card>
      <CardTitle>no-progress-indicator (fixed)</CardTitle>
      <CardBody>
        <ProgressIndicator step={2} total={3} />
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

function ProgressIndicator({ step, total }: { step: number; total: number }) {
  return <p aria-label="Progress">Step {step} of {total}</p>;
}

function WizardStep({ children }: { step: number; children: ReactNode }) {
  return <div>{children}</div>;
}
