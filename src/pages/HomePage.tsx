import { Title, Text, List, ListItem, CodeBlock, CodeBlockCode } from '@patternfly/react-core';

export function HomePage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        CognitiveLint demo — fixed UX patterns
      </Title>
      <Text component="p">
        This branch demonstrates CognitiveLint-compliant patterns across six cognitive UX
        categories. Compare with <code>main</code> to see before/after scan results.
      </Text>

      <Title headingLevel="h2" size="lg" style={{ marginTop: '1.5rem' }}>
        Run the scan
      </Title>
      <CodeBlock>
        <CodeBlockCode>
          {`cd cognitivelint_demo
pnpm install
pnpm scan
`}
        </CodeBlockCode>
      </CodeBlock>

      <Title headingLevel="h2" size="lg" style={{ marginTop: '1.5rem' }}>
        What to expect on this branch
      </Title>
      <List>
        <ListItem>Significantly fewer findings than the intentional-bug baseline on main</ListItem>
        <ListItem>Higher cognitive score after fixes</ListItem>
        <ListItem>Each sidebar page shows the remediated pattern for its category</ListItem>
      </List>
    </>
  );
}
