import { useState } from 'react';
import { Alert, Button, Title, Text, Card, CardBody, CardTitle } from '@patternfly/react-core';

/**
 * Fixed pattern:
 * - consistency/inconsistent-button-labels
 */
export function ConsistencyPage() {
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSave = () => {
    setSavedMessage('Your changes were saved.');
  };

  const handleSaveDraft = () => {
    setSavedMessage('Your draft was saved.');
  };

  const handleCancel = () => {
    setSavedMessage(null);
  };

  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Consistency
      </Title>
      <Text component="p">Save actions use consistent terminology across the page.</Text>

      <Card style={{ marginTop: '1rem' }}>
        <CardTitle>inconsistent-button-labels (fixed)</CardTitle>
        <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Alert variant="info" title="Consistent labels" isInline isPlain>
            Use the same verb for the same action type. Here, all persist actions use “Save”.
          </Alert>
          {savedMessage && (
            <Alert variant="success" title="Saved" isInline timeout={3000} onTimeout={() => setSavedMessage(null)}>
              {savedMessage}
            </Alert>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleSaveDraft}>
              Save draft
            </Button>
            <Button variant="link" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
