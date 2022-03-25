import React from 'react';
import {Text, Alert} from 'react-native';
import {SelectList, Gap} from '../components/SelectList';
import tw from 'twrnc';
import {useReadFile, useSaveFile} from '../utils/hooks';
import {getFileTime} from '../utils/time';
import {useStoreActions, useStoreState} from 'easy-peasy';

export const SettingsScreen = () => {
  const history = useStoreState(state => state.history);
  const restore = useStoreActions(state => state.restoreHistory);
  const saveBackup = useSaveFile(
    `smuzy_${getFileTime()}.json`,
    JSON.stringify(history),
  );
  const readBackup = useReadFile();

  return (
    <SelectList
      items={[
        {
          title: 'Backup to file',
          onPress: () => {
            saveBackup();
          },
        },
        {
          title: 'Restore backup',
          onPress: () => {
            readBackup(data => {
              restore(JSON.parse(data));
              Alert.alert('Done', 'Successful restored!');
            });
          },
        },
        Gap,
        'Request Feature',
        'Feedback',
        'Contact Support',
      ]}
      render={item => (
        <Text style={tw`dark:text-zinc-200 text-base`}>
          {item.title || item}
        </Text>
      )}
    />
  );
};
