function getDatesRange(dateList = null) {
  function getDate(date) {
    if (isNaN(date)) throw new Error('Fecha incorrecta');
    const day = (date.getDate() >= 0 && date.getDate() <= 9) ?
      (`0${date.getDate()}`) : (date.getDate());
    const month = (date.getMonth() >= 0 && date.getMonth() <= 9) ?
      (`0${date.getMonth() + 1}`) : (date.getMonth() + 1);
    return [
      date.getFullYear(),
      month,
      day
    ].map(String);
  }
  let startDate;
  let endDate;
  if (Array.isArray(dateList)) {
    if (dateList[0].getTime() > dateList[0].getTime())
        throw new Error('Rango incorrecto');
    startDate = (getDate(dateList[0]));
    endDate = (getDate(dateList[1]));
  } else {
    const instance = (new Date());
    startDate = (getDate(instance));
    endDate = (getDate(instance));
  }
  const getDateList = [
    new Date(`${startDate.join('-')}T00:00:00-05:00`),
    new Date(`${endDate.join('-')}T23:59:59-05:00`)
  ];
  if (getDateList.some((d) => (isNaN(d))))
      throw new Error('Una o varias fechas son incorrectas');
  // console.log(getDateList[0]);
  // console.log(getDateList[1]);
  return (getDateList);
}

export { getDatesRange };
