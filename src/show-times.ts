import { DateTime, Interval, Duration } from 'luxon';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

enum Day {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

enum Hour {
  TwelveAM,
  OneAM,
  TwoAM,
  ThreeAM,
  FourAM,
  FiveAM,
  SixAM,
  SevenAM,
  EightAM,
  NineAM,
  TenAM,
  ElevenAM,
  TwelvePM,
  OnePM,
  TwoPM,
  ThreePM,
  FourPM,
  FivePM,
  SixPM,
  SevenPM,
  EightPM,
  NinePM,
  TenPM,
  ElevenPM,
}

function showDate(day: Day, time: Hour, length: number = 1) {
  let start = DateTime.fromObject({
    weekday: day,
    hour: time,
    zone: 'America/Los_Angeles',
  });

  if (day < Day.Sunday) {
    start = start.plus({ weeks: 1 });
  }

  const duration = Duration.fromObject({ hours: length });

  const interval = Interval.after(start, duration);

  return interval;
}

const DateScalarType = {
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(dateString: string) {
    return DateTime.fromISO(dateString);
  },
  serialize(time: DateTime) {
    return time.toISO(); // value sent to the client
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING) {
      return DateTime.fromISO(ast);
    }
    return null;
  },
};

console.log(showDate(Day.Sunday, Hour.FivePM));
