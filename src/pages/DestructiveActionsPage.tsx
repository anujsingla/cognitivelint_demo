import { Button, Title, Text, Card, CardBody, CardTitle, Grid, GridItem } from '@patternfly/react-core';
import { TrashIcon } from '@patternfly/react-icons';

/**
 * Fixed patterns:
 * - error-prevention/destructive-no-confirm — delete routed through confirmation modal
 * - error-prevention/confirmation-fatigue — at most three confirmation dialogs
 */
export function DestructiveActionsPage() {
  const openDeleteConfirmModal = () => {
    console.log('opening delete confirmation modal');
  };

  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Error Prevention
      </Title>
      <Text component="p">
        Destructive actions require confirmation; confirmation dialogs are kept to a minimum.
      </Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <Card>
            <CardTitle>destructive-no-confirm (fixed)</CardTitle>
            <CardBody>
              <Button variant="danger" icon={<TrashIcon />} onClick={openDeleteConfirmModal}>
                Delete project
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12} md={6}>
          <Card>
            <CardTitle>confirmation-fatigue (fixed)</CardTitle>
            <CardBody>
              <ConfirmDialog action="archive" />
              <ConfirmDialog action="delete" />
              <ConfirmDialog action="revoke" />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}

function ConfirmDialog({ action }: { action: string }) {
  return (
    <ConfirmModal isOpen onConfirm={() => {}} title={`Confirm ${action}`} />
  );
}

function ConfirmModal({
  isOpen,
  onConfirm,
  title,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
}) {
  if (!isOpen) return null;
  return (
    <div role="alertdialog" aria-label={title}>
      <p>{title}</p>
      <button type="button" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
}
