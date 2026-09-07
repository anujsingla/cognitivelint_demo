import { useState } from 'react';
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
  Tabs,
  Tab,
  TabTitleText,
} from '@patternfly/react-core';

/**
 * Rules triggered:
 * - cognitive-load/too-many-tabs
 * - cognitive-load/destructive-as-primary
 */
export function NewRulesPage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        New Rules
      </Title>
      <Text component="p">Too many tabs and destructive actions styled as primary.</Text>

      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={12} md={6}>
          <TooManyTabsDemo />
        </GridItem>
        <GridItem span={12} md={6}>
          <DestructiveAsPrimaryDemo />
        </GridItem>
      </Grid>
    </>
  );
}

/** Static Tab elements required — parser cannot see .map()-generated JSX */
function TooManyTabsDemo() {
  const [activeTab, setActiveTab] = useState<string | number>(0);

  return (
    <Card>
      <CardTitle>too-many-tabs</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Eight top-level tabs create navigation overload.
        </Alert>
        <Tabs
          activeKey={activeTab}
          onSelect={(_event, tabIndex) => setActiveTab(tabIndex)}
          aria-label="Platform settings"
        >
          <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>}>
            <Text component="p">Cluster summary and health.</Text>
          </Tab>
          <Tab eventKey={1} title={<TabTitleText>General</TabTitleText>}>
            <Text component="p">Name, description, and defaults.</Text>
          </Tab>
          <Tab eventKey={2} title={<TabTitleText>Users</TabTitleText>}>
            <Text component="p">User accounts and invitations.</Text>
          </Tab>
          <Tab eventKey={3} title={<TabTitleText>Roles</TabTitleText>}>
            <Text component="p">Role bindings and permissions.</Text>
          </Tab>
          <Tab eventKey={4} title={<TabTitleText>Billing</TabTitleText>}>
            <Text component="p">Plans, invoices, and payment methods.</Text>
          </Tab>
          <Tab eventKey={5} title={<TabTitleText>Security</TabTitleText>}>
            <Text component="p">SSO, MFA, and API keys.</Text>
          </Tab>
          <Tab eventKey={6} title={<TabTitleText>Integrations</TabTitleText>}>
            <Text component="p">Webhook and third-party connectors.</Text>
          </Tab>
          <Tab eventKey={7} title={<TabTitleText>Audit</TabTitleText>}>
            <Text component="p">Activity log and compliance exports.</Text>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

function DestructiveAsPrimaryDemo() {
  const handleDelete = () => {
    console.log('deleted without danger styling');
  };

  return (
    <Card>
      <CardTitle>destructive-as-primary</CardTitle>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert variant="warning" title="Intentional bug" isInline isPlain>
          Delete uses primary styling instead of danger, so users may treat it as the main action.
        </Alert>
        <Button variant="primary" onClick={handleDelete}>
          Delete account
        </Button>
      </CardBody>
    </Card>
  );
}
