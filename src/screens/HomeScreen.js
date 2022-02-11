import React from 'react';
import tw from 'twrnc';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Section} from '../components/Section';

export const HomeScreen = () => {
  const isDarkMode = useColorScheme() == 'dark';

  const bgDarkMode = isDarkMode ? 'bg-gray-800' : 'bg-gray-50 bg-opacity-50';
  const viewBgDarkMode = isDarkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={tw.style(bgDarkMode)}>
        <Header />
        <View style={tw.style(viewBgDarkMode)}>
          <Section title="Step One">
            Edit <Text style={tw`font-bold`}>App.js</Text> to change this screen
            and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </>
  );
};
