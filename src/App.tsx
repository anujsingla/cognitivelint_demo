import {
  Page,
  PageSection,
  Title,
  Nav,
  NavList,
  NavItem,
  PageSidebar,
  PageSidebarBody,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Badge,
} from '@patternfly/react-core';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import { DestructiveActionsPage } from './pages/DestructiveActionsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { TrustPage } from './pages/TrustPage';
import { CognitiveLoadPage } from './pages/CognitiveLoadPage';
import { DiscoverabilityPage } from './pages/DiscoverabilityPage';
import { ConsistencyPage } from './pages/ConsistencyPage';
import { NewRulesPage } from './pages/NewRulesPage';
import { HomePage } from './pages/HomePage';

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/destructive', label: 'Error Prevention', rules: ['destructive-no-confirm', 'no-undo', 'confirmation-fatigue'] },
  { path: '/feedback', label: 'Feedback', rules: ['missing-loading-state', 'missing-empty-state', 'missing-success-feedback', 'no-progress-indicator'] },
  { path: '/trust', label: 'Trust & Confidence', rules: ['unexplained-disabled', 'ownership-ambiguity', 'missing-ownership'] },
  { path: '/cognitive-load', label: 'Cognitive Load', rules: ['excessive-primary-actions', 'long-forms', 'filter-overload', 'dense-tables'] },
  { path: '/new-rules', label: 'New Rules', rules: ['too-many-tabs', 'destructive-as-primary'] },
  { path: '/discoverability', label: 'Discoverability', rules: ['missing-search', 'hidden-primary-action', 'empty-navigation'] },
  { path: '/consistency', label: 'Consistency', rules: ['inconsistent-button-labels'] },
];

function SidebarNav() {
  const location = useLocation();

  return (
    <Nav aria-label="Demo sections">
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path} isActive={location.pathname === item.path}>
            <Link to={item.path}>{item.label}</Link>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
}

export function App() {
  return (
    <Page
      header={
        <Masthead>
          <MastheadMain>
            <MastheadBrand>
              <Title headingLevel="h1" size="lg">
                CognitiveLint Demo
              </Title>
            </MastheadBrand>
          </MastheadMain>
          <MastheadContent>
            <Badge isRead>Intentional human bugs</Badge>
          </MastheadContent>
        </Masthead>
      }
      sidebar={
        <PageSidebar>
          <PageSidebarBody>
            <SidebarNav />
          </PageSidebarBody>
        </PageSidebar>
      }
    >
      <PageSection>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destructive" element={<DestructiveActionsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/cognitive-load" element={<CognitiveLoadPage />} />
          <Route path="/new-rules" element={<NewRulesPage />} />
          <Route path="/discoverability" element={<DiscoverabilityPage />} />
          <Route path="/consistency" element={<ConsistencyPage />} />
        </Routes>
      </PageSection>
    </Page>
  );
}
