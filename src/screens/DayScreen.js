import React from 'react';
import tw from 'twrnc';
import {ScrollView, Text, useColorScheme, View} from 'react-native';
import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Section} from '../components/Section';

export const DayScreen = () => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={tw`dark:bg-[#222222] bg-white`}>
        <Header />
        <View style={tw`dark:bg-[#222222] bg-white`}>
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
