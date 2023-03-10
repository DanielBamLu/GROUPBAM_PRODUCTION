<script>
    //Still on development
    //Don't forget that urgency increase price
    // https://www.npmjs.com/package/jspdf
    // https://raw.githack.com/MrRio/jsPDF/master/index.html
    const doc = new jsPDF();
    const generateOffer = () => {
        // console.log($cart)
        doc.addImage( "/image/group_bam_logo.png", "SVG", 10, 10, 50, 15 );

        doc.setFont( "helvetica", "bold" );
        doc.setFontSize( 30 );
        doc.text( "Offer", 10, 40 );

        for ( let cartServiceIndex = 0; cartServiceIndex < $cart.services.length; cartServiceIndex++ )
        {
            let offset = 60 + ( cartServiceIndex * 10 );

            if ( cartServiceIndex >= 1 )
            {
                offset = 60 + ( cartServiceIndex * 40 ) + 10;
            }

            doc.setFont( "helvetica", "bold" );
            doc.setFontSize( 20 );
            doc.text( $cart.services[ cartServiceIndex ].title, 10, offset );

            if ( $cart.services[ cartServiceIndex ].hasPrice )
            {
                doc.setFont( "helvetica", "normal" );
                doc.setFontSize( 15 );
                doc.text( 'Unit price', 10, offset + 10 );
                doc.text( getPriceCurrency( $cart.services[ cartServiceIndex ].unitPrice ), 180, offset + 10 );
                doc.text( 'Quantity', 10, offset + 20 );
                doc.text( ( $cart.services[ cartServiceIndex ].quantity ).toString(), 180, offset + 20 );
                doc.text( 'Total price', 10, offset + 30 );
                doc.text( getPriceCurrency( $cart.services[ cartServiceIndex ].totalPrice ), 180, offset + 30 );
            }
            else
            {
                doc.setFont( "helvetica", "normal" );
                doc.setFontSize( 15 );
                doc.text( 'No price', 180, offset + 10 );
            }
        }

        doc.setFont( "helvetica", "bold" );
        doc.setFontSize( 20 );
        doc.text( 'Total price', 10, ( ( $cart.services.length ) * 60 ) );
        doc.text(getPriceCurrency( $cart.info.totalPriceCart ).toString(), 180, ( ( $cart.services.length ) * 60 ) );

        if ( $cart.info.urgency )
        {
            doc.setFont( "helvetica", "normal" );
            doc.setFontSize( 15 );
            doc.text('Its an urgency', 170, ( ( ( $cart.services.length ) * 60 ) - 20 ) );
        }

        doc.save("Bam_Offer.pdf");
        }
</script>
