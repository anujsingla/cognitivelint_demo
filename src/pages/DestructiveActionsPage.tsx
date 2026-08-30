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
} from '@patternfly/react-core';
import { TrashIcon } from '@patternfly/react-icons';

/**
 * Rules triggered:
 * - error-prevention/destructive-no-confirm
 * - error-prevention/no-undo
 * - error-prevention/confirmation-fatigue
 */
export function DestructiveActionsPage() {
  const handleDelete = () => {
    console.log('deleted without confirmation');
  };

  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Error Prevention
      </Title>
      <Text component="p">
        Destructive actions without confirmation, no undo path, and confirmation overload.
      </Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <Card>
            <CardTitle>destructive-no-confirm + no-undo</CardTitle>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Alert variant="warning" title="Intentional bug" isInline isPlain>
                Delete runs immediately with no confirmation dialog.
              </Alert>
              <Button variant="danger" icon={<TrashIcon />} onClick={handleDelete}>
                Delete project
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12} md={6}>
          <Card>
            <CardTitle>confirmation-fatigue</CardTitle>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Alert variant="warning" title="Intentional bug" isInline isPlain>
                Four stacked confirmations desensitize users to warnings.
              </Alert>
              <ConfirmDialog action="archive" />
              <ConfirmDialog action="delete" />
              <ConfirmDialog action="revoke" />
              <ConfirmDialog action="purge" />
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
    <div
      role="alertdialog"
      aria-label={title}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.75rem',
        border: '1px solid var(--pf-v5-global--BorderColor--100)',
        borderRadius: 'var(--pf-v5-global--BorderRadius--sm)',
      }}
    >
      <Text component="p">{title}</Text>
      <Button variant="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );
}
