.headers on
.mode csv
.output rawAnalysisData.csv
select P.userId,
  M.patientId,
  M.illnessId,
  M.id,
  M.ageInMonths,
  -- M.dateOfBirth, -- excluded because irrelevant
  M.patientState,
  --  M.progress, -- excluded because irrelevant
  --  M.eventState,
  M.timestampOfCreation,
  M.timestampOfCreationOnDevice,
  -- FEVER SECTION
  M.feverDuration,
  M.feverDurationState,
  ifnull(M.temperatureAdjusted, M.temperature) as temperature,
  M.temperatureState,
  --  M.feverMeasurementLocation,
  --  M.feverMeasurementLocationState,
  --  M.thermometerUsed,
  --  M.thermometerUsedState,
  -- MEDICATION SECTION
  M.antibiotics,
  M.antibioticsState,
  M.antibioticsHowManyTimes as antibioticsHowMany,
  M.antibioticsHowManyTimesState as antibioticsHowManyState,
  M.antibioticsHowMuch,
  --  M.antibioticsWhat, -- excluded because arbitrary text
  M.antipyreticMedication as antipyretic,
  M.antipyreticMedicationState as antipyreticState,
  M.antipyreticMedicationHowManyTimes as antipyreticHowMany,
  M.antipyreticMedicationHowManyTimesState as antipyreticHowManyState,
  M.antipyreticMedicationHowMuch as antipyreticHowMuch,
  --  M.antipyreticMedicationWhat as antipyreticWhat,
  --  M.antipyreticMedicationWhy as antipyreticReason,
  -- HYDRATION SECTION
  M.crying,
  M.cryingState,
  M.diarrhea,
  M.diarrheaState,
  M.drinking,
  M.drinkingState,
  M.lastUrination,
  M.lastUrinationState,
  M.skinTurgor,
  M.skinTurgorState,
  M.tearsWhenCrying,
  M.tearsWhenCryingState,
  M.tongue,
  M.tongueState,
  M.vomit,
  M.vomitState,
  -- RESPIRATION SECTION
  M.dyspnea,
  M.dyspneaState,
  M.respiratoryRate,
  M.respiratoryRateState,
  M.wheezing,
  M.wheezingState,
  -- SKIN SECTION
  M.glassTest,
  M.glassTestState,
  M.rash,
  M.rashState,
  M.skinColor,
  M.skinColorState,
  -- PULSE SECTION
  M.pulse,
  M.pulseState,
  -- GENERAL SECTION
  M.awareness,
  M.awarenessState,
  M.bulgingFontanelleMax18MOld,
  M.bulgingFontanelleMax18MOldState,
  --  M.chronicDisease, -- excluded because irrelevant
  M.exoticTripInTheLast12Months as exoticTrip,
  M.exoticTripInTheLast12MonthsState as exoticTripState,
  M.lastTimeEating,
  M.lastTimeEatingState,
  M.pain,
  M.painState,
  M.painfulUrination,
  M.painfulUrinationState,
  M.febrileSeizure as seizure,
  M.febrileSeizureState as seizureState,
  M.smellyUrine,
  M.smellyUrineState,
  M.vaccinationsWithIn14days as vaccinationIn14days,
  M.vaccinationsWithIn14daysState as vaccinationIn14daysState,
  M.vaccinationsHowManyHoursAgo as vaccinationHowManyHoursAgo,
  M.vaccinationsHowManyHoursAgoState as vaccinationHowManyHoursAgoState,
  --  M.vaccinationsUsedVaccination, -- excluded because arbitrary text
  M.wryNeck,
  M.wryNeckState
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