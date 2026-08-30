import { Button, Title, Text, Card, CardBody, CardTitle } from '@patternfly/react-core';

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
        <CardBody style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={handlePersist}>
            Save
          </Button>
          <Button variant="secondary" onClick={handlePersistAlt}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handlePersistAlt}>
            Apply
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
