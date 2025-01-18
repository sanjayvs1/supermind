const Swisseph = require('swisseph-v2');

class Kundali {
    static setHouseMethod(hsys) {
        this.houseMethod = hsys;
    }

    static setEphemeridesPath(path = null) {
        if (path) {
            Swisseph.swe_set_ephe_path(path);
        }
    }

    static getPlanetPosition(date, planet) {
        const julianDate = this.toJulianUTCDate(date);
        const flags = Swisseph.SEFLG_SPEED;
        const planetData = Swisseph.swe_calc_ut(julianDate, planet, flags);
        return planetData;
    }

    static toJulianUTCDate(date) {
        const julianDay = Swisseph.swe_utc_to_jd(
            date.getUTCFullYear(), 
            date.getUTCMonth() + 1, 
            date.getUTCDate(), 
            date.getUTCHours(), 
            date.getUTCMinutes(), 
            0,
            Swisseph.SE_GREG_CAL
        );

        let jdUT;
        if ('julianDayUT' in julianDay) {
            jdUT = julianDay.julianDayUT;
        } else if ('error' in julianDay) {
            jdUT = julianDay.error;
        }
        return jdUT;
    }

    static toGregorianUTCDate(julianDate) {
        return Swisseph.swe_jdut1_to_utc(julianDate, Swisseph.SE_GREG_CAL);
    }

    static generateKundali(date) {
        const planets = [
            Swisseph.SE_SUN, 
            Swisseph.SE_MOON, 
            Swisseph.SE_MARS, 
            Swisseph.SE_MERCURY, 
            Swisseph.SE_JUPITER, 
            Swisseph.SE_VENUS, 
            Swisseph.SE_SATURN, 
            Swisseph.SE_URANUS, 
            Swisseph.SE_NEPTUNE, 
            Swisseph.SE_PLUTO
        ];
        
        const kundali = {};

        planets.forEach(planet => {
            const planetPosition = this.getPlanetPosition(date, planet);
            if (!planetPosition.error) {
                kundali[planet] = planetPosition;
            } else {
                console.error(`Error fetching planet data: ${planetPosition.error}`);
            }
        });

        return kundali;
    }
static getHouses(date, latitude, longitude) {
    const julianDate = this.toJulianUTCDate(date);
    const houses = Swisseph.swe_houses(
        julianDate,
        latitude,
        longitude,
        this.houseMethod || 'P'
    );
    return {
        ...houses,
        cusps: houses.house
    };
}

static generateBirthChart(date, latitude, longitude) {
    const planets = this.generateKundali(date);
    const houses = this.getHouses(date, latitude, longitude);
    
    return {
        planets,
        houses,
        insights: {
            career: this.interpretHouse(houses, planets, 10),
            relationships: this.interpretHouse(houses, planets, 7),
            personalGrowth: this.interpretHouse(houses, planets, 1),
            family: this.interpretHouse(houses, planets, 4),
            socialConnections: this.interpretHouse(houses, planets, 11)
        }
    };
}

static interpretHouse(houses, planets, houseNumber) {
    const houseStart = houses.cusps[houseNumber];
    const houseEnd = houses.cusps[houseNumber + 1] || houses.cusps[1];
    const planetsInHouse = Object.entries(planets).filter(([_, pos]) => 
        this.isPositionInRange(pos.longitude, houseStart, houseEnd)
    );
    return {
        houseStart,
        houseEnd,
        planetsInHouse
    };
}

static isPositionInRange(position, start, end) {
    if (start <= end) {
        return position >= start && position < end;
    } else {
        return position >= start || position < end;
    }
}
}

// Example: Generate Kundali for a given birth date
const birthDate = new Date(Date.UTC(1992, 11, 25, 12, 0)); // Date of birth in UTC
const kundaliData = Kundali.generateKundali(birthDate);
const birthChart = Kundali.generateBirthChart(birthDate, 23.7, 78.9); // Example coordinates for New Delhi
console.log('Birth Chart:', birthChart);
console.log('Kundali Data:', kundaliData);

module.exports = Kundali;
