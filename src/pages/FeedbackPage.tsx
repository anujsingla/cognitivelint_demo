import type { ReactNode } from 'react';
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
} from '@patternfly/react-core';
import { InboxIcon } from '@patternfly/react-icons';
import { useMutation } from '@tanstack/react-query';

/**
 * Rules triggered:
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
      <Text component="p">Missing loading, empty, success, and progress indicators.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <MissingLoadingDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <MissingEmptyStateDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <CreateItemDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <NoProgressIndicatorDemo />
        </GridItem>
      </Grid>
    </>
  );
}

function MissingLoadingDemo() {
  const handleSave = () => {
    fetch('/api/save', { method: 'POST' });
  };

  return (
    <Card>
      <CardTitle>missing-loading-state</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Save starts a request but gives no loading feedback.
        </Alert>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </CardBody>
    </Card>
  );
}

function MissingEmptyStateDemo() {
  const items: { id: string; name: string }[] = [];

  return (
    <Card>
      <CardTitle>missing-empty-state</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          The list is empty but no empty-state message is wired to the data list.
        </Alert>
        <EmptyState variant="sm">
          <EmptyStateHeader
            titleText="Visual placeholder only"
            icon={<EmptyStateIcon icon={InboxIcon} />}
          />
          <EmptyStateBody>
            <Text component="p">This decorative empty state does not satisfy the data list rule.</Text>
          </EmptyStateBody>
        </EmptyState>
        <DataList aria-label="Team items" items={items} />
      </CardBody>
    </Card>
  );
}

function DataList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
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
  });

  return (
    <Card>
      <CardTitle>create without feedback</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Create completes silently with no success confirmation.
        </Alert>
        <Button variant="primary" onClick={() => mutation.mutate({ name: 'demo' })}>
          Create item
        </Button>
      </CardBody>
    </Card>
  );
}

function NoProgressIndicatorDemo() {
  return (
    <Card>
      <CardTitle>no-progress-indicator</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Multi-step content with no progress indicator.
        </Alert>
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
