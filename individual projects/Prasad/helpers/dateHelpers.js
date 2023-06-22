class DateHelpers {

    monthIndexToMonth(date) {
        console.log("HELPER CLALLED");
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
};

export default DateHelpers;
