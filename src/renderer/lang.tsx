import React, { useContext } from 'react';
import { LangConfigContext } from 'coulomb/localizer/renderer/context';
import { Position, Popover, Button, Menu, Tag } from '@blueprintjs/core';


const LanguageMenu: React.FC<{}> = function () {
  const lang = useContext(LangConfigContext);

  return (
    <Menu>
      <Menu.Item
        key={lang.default}
        active={lang.selected === lang.default}
        text={lang.available[lang.default]}
        labelElement={<Tag minimal>Default</Tag>}
        onClick={() => lang.select(lang.default)} />

      <Menu.Divider title="Show translation" />

      {Object.entries(lang.available).
          filter(([langId, _]) => langId !== lang.default).
          map(([langId, langName]) => (
        <Menu.Item
          active={lang.selected === langId}
          key={langId}
          text={langName}
          onClick={() => lang.select(langId)} />
      ))}
    </Menu>
  );
};

export const LangSelector: React.FC<{}> = function () {
  const lang = useContext(LangConfigContext);
  const langName = lang.available[lang.selected];

  return (
    <Popover content={<LanguageMenu />} position={Position.BOTTOM_LEFT}>
      <Button
        icon="translate"
        rightIcon="caret-up"
        active={lang.selected !== lang.default}
        title={lang.selected !== lang.default
          ? `Showing ${langName} translation`
          : `Showing default language (${langName})`}
        text={lang.selected !== lang.default
          ? langName
          : undefined} />
    </Popover>
  );
};