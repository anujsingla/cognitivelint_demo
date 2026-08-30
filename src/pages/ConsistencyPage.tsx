import { Alert, Button, Title, Text, Card, CardBody, CardTitle } from '@patternfly/react-core';

/**
 * Rules triggered:
 * - consistency/inconsistent-button-labels
 */
export function ConsistencyPage() {
  const handlePersist = () => {};
  const handlePersistAlt = () => {};

  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Consistency
      </Title>
      <Text component="p">Mixed terminology for the same action confuses users.</Text>

      <Card style={{ marginTop: '1rem' }}>
        <CardTitle>inconsistent-button-labels</CardTitle>
        <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Alert variant="warning" title="Intentional bug" isInline isPlain>
            Save, Submit, and Apply describe the same action with different labels.
          </Alert>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={handlePersist}>
              Save
            </Button>
            <Button variant="secondary" onClick={handlePersistAlt}>
              Submit
            </Button>
            <Button variant="secondary" onClick={handlePersistAlt}>
              Apply
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
