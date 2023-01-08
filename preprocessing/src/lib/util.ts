import dayjs from 'dayjs';

export const getAge = (
  dateOfBirth: Date | null,
  createdAt: Date | null,
  format: 'year' | 'month' = 'month'
) => {
  if (dateOfBirth === null || createdAt === null) {
    return null;
  }
  const dateOfBirthMoment = dayjs(dateOfBirth);
  const date = dayjs(createdAt);

  if (format === 'month') {
    return date.diff(dateOfBirthMoment, 'month', true);
  } else {
    return date.diff(dateOfBirthMoment, 'year', true);
  }
};
