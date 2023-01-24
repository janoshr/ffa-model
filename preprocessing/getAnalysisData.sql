.headers on
.mode csv
.output rawAnalysisData.csv
select P.userId,
  M.id,
  M.illnessId,
  M.patientId,
  M.ageInMonths,
  M.antibiotics,
  M.antibioticsHowManyTimes,
--  M.antibioticsHowManyTimesState,
  M.antibioticsHowMuch,
--  M.antibioticsState,
--  M.antibioticsWhat, -- excluded because arbitrary text
  M.antipyreticMedication,
--  M.antipyreticMedicationHowManyTimesState,
  M.antipyreticMedicationHowManyTimes,
  M.antipyreticMedicationHowMuch,
--  M.antipyreticMedicationState,
  M.antipyreticMedicationWhat,
--  M.antipyreticMedicationWhy,
  M.awareness,
--  M.awarenessState,
  M.bulgingFontanelleMax18MOld,
--  M.bulgingFontanelleMax18MOldState,
  M.chronicDisease,
  M.crying,
--  M.cryingState,
  M.dateOfBirth,
  M.diarrhea,
--  M.diarrheaState,
  M.drinking,
--  M.drinkingState,
  M.dyspnea,
--  M.dyspneaState,
--  M.eventState,
  M.exoticTripInTheLast12Months,
--  M.exoticTripInTheLast12MonthsState,
  M.febrileSeizure,
--  M.febrileSeizureState,
  M.feverDuration,
--  M.feverDurationState,
--  M.feverMeasurementLocation,
--  M.feverMeasurementLocationState,
  M.glassTest,
--  M.glassTestState,
  M.lastTimeEating,
--  M.lastTimeEatingState,
  M.lastUrination,
--  M.lastUrinationState,
  M.pain,
--  M.painState,
  M.painfulUrination,
--  M.painfulUrinationState,
  M.patientState,
  M.progress,
  M.pulse,
  M.pulseState,
  M.rash,
--  M.rashState,
  M.respiratoryRate,
  M.respiratoryRateState,
  M.skinColor,
--  M.skinColorState,
  M.skinTurgor,
--  M.skinTurgorState,
  M.smellyUrine,
--  M.smellyUrineState,
  M.tearsWhenCrying,
--  M.tearsWhenCryingState,
  ifnull(M.temperatureAdjusted, M.temperature) as temperature,
--  M.temperatureState,
--  M.thermometerUsed,
--  M.thermometerUsedState,
  M.timestampOfCreation,
  M.timestampOfCreationOnDevice,
  M.tongue,
--  M.tongueState,
  M.vaccinationsWithIn14days,
--  M.vaccinationsWithIn14daysState,
  M.vaccinationsHowManyHoursAgo,
--  M.vaccinationsHowManyHoursAgoState,
--  M.vaccinationsUsedVaccination, -- excluded because arbitrary text
  M.vomit,
--  M.vomitState,
  M.wheezing,
--  M.wheezingState,
  M.wryNeck
--,  M.wryNeckState
from MeasurementEvent M
  inner join Patient P on P.id = M.patientId
  inner join User U on U.id = P.userId
where M.illnessId != 'noId'
  and U.participateInResearch = true
  and (
    not U.email like 'janos.hajdurafis%'
    or U.email is null
  )
  -- and temperature is not null
  -- and pulse is not null
  -- and respiratoryRate is not null
;
.output stdout