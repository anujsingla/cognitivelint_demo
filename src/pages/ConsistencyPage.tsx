import { Button, Title, Text, Card, CardBody, CardTitle } from '@patternfly/react-core';

/**
 * Fixed pattern:
 * - consistency/inconsistent-button-labels
 */
export function ConsistencyPage() {
  const handleSave = () => {};
  const handleSaveDraft = () => {};
  const handleCancel = () => {};

  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Consistency
      </Title>
      <Text component="p">Save actions use consistent terminology.</Text>

      <Card style={{ marginTop: '1rem' }}>
        <CardTitle>inconsistent-button-labels (fixed)</CardTitle>
        <CardBody style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Save draft
          </Button>
          <Button variant="link" onClick={handleCancel}>
            Cancel
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
