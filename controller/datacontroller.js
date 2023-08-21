const abbreviations = require('../utilities/abbreviations');
const inverted = require('../utilities/inverted');

module.exports = {
    Data: async (req, res) => {
        try {
            const actualUserQuery = req.body.query.toLowerCase();
            let isAbbreviation = false;
            let abbreviatedQuery = actualUserQuery;
            let isInvertedAbbreviation = false;
            let invertedAbbreviatedQuery = actualUserQuery;

            for (const key in abbreviations) {
                //console.log(key)
                //Create pattern for match 
                // \\b Find a match at the beginning/end of a word
                // 'g',search  global match 
                const regex = new RegExp(`\\b${key.toLowerCase()}\\b`, 'g');
                //console.log(regex)
                if (abbreviatedQuery.match(regex)) {
                    abbreviatedQuery = abbreviatedQuery.replace(regex, abbreviations[key].toLowerCase());
                    isAbbreviation = true;
                }
            }

            for (const key in inverted) {
                const regex = new RegExp(`\\b${inverted[key].toLowerCase()}\\b`, 'g');
                //console.log(regex)
                if (abbreviatedQuery.match(regex)) {
                    abbreviatedQuery = abbreviatedQuery.replace(regex, inverted[key].toLowerCase());
                    isInvertedAbbreviation = true;
                }
            }

            const response = {
                actualUserQuery: actualUserQuery,
                isAbbreviationPresent: isAbbreviation,
                abbreviatedQuery: abbreviatedQuery,
                isInvertedAbbreviation: isInvertedAbbreviation,
                invertedAbbreviatedQuery: invertedAbbreviatedQuery,
            };

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
