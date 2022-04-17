import React from 'react';
import {Alert, Text} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import tw from 'twrnc';
import {Gap, SelectList} from '../../components/SelectList';
import {useReadFile, useSaveFile} from '../../utils/hooks';
import {getFileTime} from '../../utils/time';

export const SettingsScreen = () => {
  const history = useStoreState(state => state.history);
  const routines = useStoreState(state => state.routines);
  const colors = useStoreState(state => state.colors);
  const restoreBackup = useStoreActions(state => state.restoreBackup);
  const saveBackup = useSaveFile(
    `smuzy_${getFileTime()}.json`,
    JSON.stringify({routines, colors, history}),
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
              const parsedData = JSON.parse(data) || {};
              if (
                parsedData.routines &&
                parsedData.history &&
                parsedData.colors
              ) {
                restoreBackup(parsedData);
                Alert.alert('Done', 'Successful restored!');
              } else {
                Alert.alert('Error', 'File is not correct');
              }
            });
          },
        },
        // Gap,
        // 'Request Feature',
        // 'Feedback',
        // 'Contact Support',
      ]}
      render={item => (
        <Text style={tw`dark:text-zinc-200 text-base`}>
          {item.title || item}
        </Text>
      )}
    />
  );
};
