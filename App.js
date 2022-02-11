import React from 'react';
import tw from 'twrnc';
import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
} from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() == 'dark';
  const textColorDarkMode = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View style={tw`pl-6 pr-6 mt-7`}>
      <Text style={tw`text-2xl font-semibold ${textColorDarkMode}`}>
        {title}
      </Text>
      <Text
        style={tw`mt-2 text-lg font-normal leading-tight ${textColorDarkMode}`}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() == 'dark';

  const bgDarkMode = isDarkMode ? 'bg-gray-800' : 'bg-gray-50 bg-opacity-50';
  const viewBgDarkMode = isDarkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <SafeAreaView style={tw.style(bgDarkMode)}>
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
    </SafeAreaView>
  );
};
export default App;
