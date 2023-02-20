export function review(
    reviewObject,
    )
{
    let reviewSum = 0;
    let reviewCount = 0;
    let reviewAverage = 0;
    let numberStarsEnable = 0;
    let numberStarsDisable = 0;

    let reviewAverageByRating =
    {
        5 : 0,
        4 : 0,
        3 : 0,
        2 : 0,
        1 : 0
    };

    for ( let reviewIndex = 0; reviewIndex < reviewObject.length; ++reviewIndex )
    {
        reviewCount = reviewCount + 1;
        reviewSum = reviewObject[ reviewIndex ].review.rating + reviewSum;

        for ( const key in reviewAverageByRating )
        {
            if ( key == reviewObject[ reviewIndex ].review.rating )
            {
                reviewAverageByRating[ key ] = reviewAverageByRating[ key ] + 1;
            }
        }
    }

    for ( const key in reviewAverageByRating )
    {
        reviewAverageByRating[ key ] = ( ( 100 * reviewAverageByRating[ key ] ) / reviewCount );
    }

    reviewAverage = reviewSum/reviewCount;
    reviewAverage = reviewAverage.toFixed( 1 );

    numberStarsEnable = Math.floor( reviewAverage );
    numberStarsDisable = 5 - numberStarsEnable;

    return {
        reviewAverageByRating,
        numberStarsEnable,
        numberStarsDisable,
        reviewAverage,
        reviewCount,
    };
}
