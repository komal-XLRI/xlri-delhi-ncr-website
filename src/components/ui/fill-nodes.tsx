import { Fragment, type ReactNode } from 'react';

/**
 * `fill` (lib/format/template) for a template whose values are elements —
 * "Showing {shown} of {total} faculty" with the shown count in bold. A
 * placeholder with no value is left as written.
 */
export function fillNodes(template: string, values: Readonly<Record<string, ReactNode>>) {
  return template
    .split(/\{(\w+)\}/)
    .map((part, index) => (
      <Fragment key={index}>
        {index % 2 === 1 ? (part in values ? values[part] : `{${part}}`) : part}
      </Fragment>
    ));
}
