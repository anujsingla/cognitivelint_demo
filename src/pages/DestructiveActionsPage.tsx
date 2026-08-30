import { useState } from 'react';
import {
  Button,
  Title,
  Text,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  Modal,
} from '@patternfly/react-core';
import { TrashIcon } from '@patternfly/react-icons';

type ConfirmAction = 'archive' | 'revoke' | 'purge';

const CONFIRM_ACTIONS: Record<
  ConfirmAction,
  { label: string; title: string; message: string; confirmLabel: string }
> = {
  archive: {
    label: 'Archive project',
    title: 'Archive project?',
    message: 'Archived projects are hidden from the dashboard but can be restored later.',
    confirmLabel: 'Archive',
  },
  revoke: {
    label: 'Revoke access',
    title: 'Revoke team access?',
    message: 'Team members will lose access immediately until access is granted again.',
    confirmLabel: 'Revoke access',
  },
  purge: {
    label: 'Purge cache',
    title: 'Purge cache?',
    message: 'Cached responses are cleared and the next request may be slower.',
    confirmLabel: 'Purge cache',
  },
};

/**
 * Fixed patterns:
 * - error-prevention/destructive-no-confirm — delete routed through confirmation modal
 * - error-prevention/confirmation-fatigue — at most three confirmation dialogs
 */
export function DestructiveActionsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const openDeleteConfirmModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Project deleted after confirmation');
    setIsDeleteModalOpen(false);
  };

  const openActionConfirmModal = (action: ConfirmAction) => {
    setConfirmAction(action);
  };

  const closeActionConfirmModal = () => {
    setConfirmAction(null);
  };

  const handleActionConfirm = () => {
    if (confirmAction) {
      console.log(`${confirmAction} confirmed`);
    }
    setConfirmAction(null);
  };

  const activeAction = confirmAction ? CONFIRM_ACTIONS[confirmAction] : null;

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
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Text component="p">
                Each action opens one confirmation dialog. Only high-impact actions ask twice.
              </Text>
              {(Object.keys(CONFIRM_ACTIONS) as ConfirmAction[]).map((action) => (
                <Button
                  key={action}
                  variant="secondary"
                  onClick={() => openActionConfirmModal(action)}
                >
                  {CONFIRM_ACTIONS[action].label}
                </Button>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Modal
        variant="small"
        title="Delete project?"
        titleIconVariant="warning"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteConfirmModal}
        actions={[
          <Button key="cancel" variant="link" onClick={closeDeleteConfirmModal}>
            Cancel
          </Button>,
          <Button key="delete" variant="danger" onClick={handleDeleteConfirm}>
            Delete project
          </Button>,
        ]}
      >
        <Text component="p">
          This permanently removes the project and all related resources. This action cannot be
          undone.
        </Text>
      </Modal>

      <Modal
        variant="small"
        title={activeAction?.title ?? ''}
        titleIconVariant="warning"
        isOpen={confirmAction !== null}
        onClose={closeActionConfirmModal}
        actions={[
          <Button key="cancel" variant="link" onClick={closeActionConfirmModal}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={handleActionConfirm}>
            {activeAction?.confirmLabel ?? 'Confirm'}
          </Button>,
        ]}
      >
        <Text component="p">{activeAction?.message}</Text>
      </Modal>
    </>
  );
}
