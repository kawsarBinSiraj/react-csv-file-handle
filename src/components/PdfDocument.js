import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    tableTdFirst: {
        padding: 5,
        backgroundColor: '#ddd',
        fontWeight: 'bold'
    },
    tableTdSecond: {
        padding: 5,
    },
    tableBody: {
        margin: 20,
        fontSize: 10,
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 7,
    },
});


// Create Document Component
export const PdfDocument = ({ data }) => {
    return (
        <>
            <Document>
                <Page size="A4">
                    <View style={styles.tableBody}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>Project Name : </Text>
                            <Text style={styles.tableTdSecond}>{data.projectname && data.projectname}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>Project Description : </Text>
                            <Text style={styles.tableTdSecond}>{data.projectdescription && data.projectdescription}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>Client : </Text>
                            <Text style={styles.tableTdSecond}>{data.client && data.client}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>contractor : </Text>
                            <Text style={styles.tableTdSecond}>{data.contractor && data.contractor}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>max_X : </Text>
                            <Text style={styles.tableTdSecond}>{data.max_X && data.max_X}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>max_Y : </Text>
                            <Text style={styles.tableTdSecond}>{data.max_Y && data.max_Y}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>max_Z : </Text>
                            <Text style={styles.tableTdSecond}>{data.max_Z && data.max_Z}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>min_X : </Text>
                            <Text style={styles.tableTdSecond}>{data.min_X && data.min_X}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>min_Y : </Text>
                            <Text style={styles.tableTdSecond}>{data.min_Y && data.min_Y}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableTdFirst}>min_Z : </Text>
                            <Text style={styles.tableTdSecond}>{data.min_Z && data.min_Z}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    )
}

export default PdfDocument
