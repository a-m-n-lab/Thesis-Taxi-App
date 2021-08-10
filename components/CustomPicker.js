import { Picker } from "react-native-option-picker";

export const CustomPicker = () => {
  function _onPress(elem) {
    alert(JSON.stringify(elem));
  }

  return (
    <Picker
      data={[
        { id: "1", title: "Economy", selected: false },
        { id: "2", title: "SUV", selected: true },
        { id: "3", title: "Minivan", selected: false },
      ]}
      onPress={this._onPress}
    />
  );
};
