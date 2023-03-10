import { Database } from 'senselogic-eureka';
import { Mysql2Driver } from 'senselogic-eureka-mysql2';

export const database = new Database( process.env.MYSQLDATABASE ?? 'wave' );

export const languageTable
    = database.addTable(
          'LANGUAGE',
          [
              [ 'id', 'TUID', [ 'key' ] ],
              [ 'code', 'STRING' ],
              [ 'text', 'MAP' ],
              [ 'number', 'UINT32' ],
              [ 'iconPath', 'STRING' ]
          ]
          );

export const textTable
    = database.addTable(
          'TEXT',
          [
              [ 'id', 'TUID', [ 'key' ] ],
              [ 'code', 'STRING' ],
              [ 'slug', 'STRING' ],
              [ 'text', 'MAP' ]
          ]
          );

export const currencyTable
    = database.addTable(
        'CURRENCY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'STRING' ],
            [ 'code', 'STRING' ],
            [ 'symbol', 'STRING' ]
        ]
        );

export const countryTable
    = database.addTable(
        'COUNTRY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'STRING' ],
            [ 'slug', 'STRING' ],
            [ 'currencyId', 'TUID' ]
        ]
        );

export const countryLanguageTable
    = database.addTable(
        'COUNTRY_LANGUAGE',
        [
            [ 'countryId', 'TUID'],
            [ 'languageId', 'TUID' ]
        ]
        );

export const companyTable
    = database.addTable(
        'COMPANY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'STRING' ],
            [ 'slug', 'STRING' ],
            [ 'summary', 'MAP' ],
            [ 'description', 'MAP' ],
            [ 'domain', 'MAP' ],
            [ 'iconPath', 'STRING' ],
            [ 'iconGrayPath', 'STRING' ],
            [ 'imagePath', 'STRING' ],
            [ 'number', 'UINT32' ],
            [ 'color', 'STRING' ],
        ]
        );

export const categoryTable
    = database.addTable(
        'CATEGORY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'title', 'MAP' ],
            [ 'slug', 'STRING' ],
            [ 'number', 'UINT32' ],
            [ 'companyId', 'TUID' ]
        ]
        );

export const industryTable
    = database.addTable(
        'INDUSTRY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ],
            [ 'slug', 'STRING' ],
            [ 'iconPath', 'STRING' ]
        ]
        );

export const companyIndustryTable
    = database.addTable(
        'COMPANY_INDUSTRY',
        [
            [ 'companyId', 'TUID' ],
            [ 'industryId', 'TUID' ],
        ]
        );

export const serviceTable
    = database.addTable(
          'SERVICE',
          [
              [ 'id', 'TUID', [ 'key' ] ],
              [ 'title', 'STRING' ],
              [ 'slug', 'STRING' ],
              [ 'description', 'MAP' ],
              [ 'additionalTitle', 'MAP' ],
              [ 'additionalDescription', 'MAP' ],
              [ 'imagePath', 'STRING' ],
              [ 'unitTime', 'FLOAT32' ],
              [ 'unitPrice', 'MAP' ],
              [ 'companyId', 'TUID' ],
              [ 'categoryId', 'TUID' ],
              [ 'highlight', 'BOOL' ],
              [ 'hasPrice', 'BOOL' ]
            ]
          );

export const serviceIndustryTable
    = database.addTable(
          'SERVICE_INDUSTRY',
          [
            [ 'serviceId', 'TUID' ],
            [ 'industryId', 'TUID' ],
            ]
          );

export const serviceImageTable
    = database.addTable(
          'SERVICE_IMAGE',
          [
              [ 'id', 'TUID', [ 'key' ] ],
              [ 'serviceId', 'TUID' ],
              [ 'number', 'FLOAT32' ],
              [ 'imagePath', 'STRING' ]
            ]
          );

export const servicePackTypeTable
    = database.addTable(
        'SERVICE_PACK_TYPE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ],
            [ 'number', 'FLOAT32' ]
            ]
        );

export const servicePackTable
    = database.addTable(
        'SERVICE_PACK',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ],
            [ 'typeId', 'TUID' ],
            [ 'price', 'MAP' ],
            [ 'quantity', 'UINT32' ],
            [ 'totalPrice', 'MAP' ],
            [ 'description', 'MAP' ],
            [ 'number', 'UINT32' ],
            [ 'imagePath', 'STRING' ],
            [ 'serviceId', 'TUID' ],
            [ 'color', 'STRING' ],
        ]
        );

export const servicePackIncludeTable
    = database.addTable(
        'SERVICE_PACK_INCLUDE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'packId', 'TUID' ],
            [ 'text', 'MAP' ]
        ]
        );

export const serviceAdvantageTable
    = database.addTable(
        'SERVICE_ADVANTAGE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ],
            [ 'description', 'MAP' ],
            [ 'number', 'UINT32' ],
            [ 'imagePath', 'STRING' ],
            [ 'serviceId', 'TUID' ]
        ]
        );

export const serviceProcessTable
    = database.addTable(
        'SERVICE_PROCESS',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ],
            [ 'description', 'MAP' ],
            [ 'number', 'UINT32' ],
            [ 'serviceId', 'TUID' ]
        ]
        );

export const serviceInformationTable
    = database.addTable(
        'SERVICE_INFORMATION',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'question', 'MAP' ],
            [ 'answer', 'MAP' ],
            [ 'serviceId', 'TUID' ]
        ]
        );

export const serviceReviewTable
    = database.addTable(
        'SERVICE_REVIEW',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'rating', 'UINT32' ],
            [ 'title', 'STRING' ],
            [ 'text', 'STRING' ],
            [ 'dateTime', 'DATETIME' ],
            [ 'userId', 'TUID' ],
            [ 'serviceId', 'TUID' ]
        ]
        );

export const serviceOptionTypeTable
    = database.addTable(
        'SERVICE_OPTION_TYPE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'type', 'STRING' ]
        ]
        );

export const serviceOptionTable
    = database.addTable(
        'SERVICE_OPTION',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'text', 'MAP' ],
            [ 'description', 'MAP' ],
            [ 'typeId', 'TUID' ],
            [ 'serviceId', 'TUID' ]
        ]
        );

export const serviceOptionVariantTable
    = database.addTable(
        'SERVICE_OPTION_VARIANT',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'text', 'MAP' ],
            [ 'value', 'MAP' ],
            [ 'price', 'MAP' ],
            [ 'optionId', 'TUID' ],
        ]
        );

export const orderTable
    = database.addTable(
        'ORDER',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'referenceNumber', 'UUID' ],
            [ 'totalPrice', 'MAP' ],
            [ 'productionTime', 'FLOAT' ],
            [ 'description', 'STRING' ],
            [ 'documentArray', 'LIST' ],
            [ 'contactFirstName', 'STRING' ],
            [ 'contactLastName', 'STRING' ],
            [ 'contactEmail', 'STRING' ],
            [ 'billingFirstName', 'STRING' ],
            [ 'billingLastName', 'STRING' ],
            [ 'billingFirstAddressLine', 'STRING' ],
            [ 'billingSecondAddressLine', 'STRING' ],
            [ 'billingCity', 'STRING' ],
            [ 'billingCityCode', 'STRING' ],
            [ 'billingProvince', 'STRING' ],
            [ 'billingCountrySlug', 'STRING' ],
            [ 'status', 'STRING' ],
            [ 'orderDateTime', 'DATETIME' ],
            [ 'deliveryDateTime', 'DATETIME' ],
            [ 'userId', 'TUID' ],
            [ 'urgency', 'BOOL' ]
        ]
        );

export const orderServiceTable
    = database.addTable(
        'ORDER_SERVICE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'orderId', 'TUID' ],
            [ 'serviceId', 'TUID' ],
            [ 'quantity', 'UINT32' ],
            [ 'status', 'STRING' ]
        ]
        );

export const orderServicePackTable
    = database.addTable(
        'ORDER_SERVICE_PACK',
        [
            [ 'orderServiceId', 'TUID' ],
            [ 'servicePack', 'TUID' ]
        ]
        );

export const orderServiceOptionVariantTable
    = database.addTable(
        'ORDER_SERVICE_OPTION_VARIANT',
        [
            [ 'orderServiceId', 'TUID' ],
            [ 'value', 'STRING' ]
        ]
        );

export const taskTable
    = database.addTable(
        'TASK',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'text', 'STRING' ],
            [ 'taskTypeId', 'TUID' ],
            [ 'orderId', 'TUID' ],
            [ 'statusCode', 'STRING' ]
        ]
        );

export const taskTypeTable
    = database.addTable(
        'TASK_TYPE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'name', 'MAP' ]
        ]
        );

export const taskStatusTable
    = database.addTable(
        'TASK_STATUS',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'code', 'STRING' ],
            [ 'text', 'MAP' ]
        ]
        );

export const resourceTable
    = database.addTable(
        'RESOURCE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'taskTypeArray', 'LIST' ],
            [ 'taskArray', 'LIST' ]
        ]
        );

export const resourceScheduleRuleTable
    = database.addTable(
        'RESOURCE_SCHEDULE_RULE',
        [
            [ 'filter', 'TUID' ],
            [ 'firstDate', 'DATE' ],
            [ 'lastDate', 'DATE' ],
            [ 'duration', 'FLOAT32'],
            [ 'isWorking', 'TUID' ],
            [ 'pattern', 'STRING' ]
        ]
        );

export const resourcePoolTable
    = database.addTable(
        'RESOURCE_POOL',
        [
            [ 'id', 'TUID' ],
            [ 'taskTypeId', 'TUID' ],
            [ 'resourceIdArray', 'LIST' ]
        ]
        );

export const testimonialTable
    = database.addTable(
        'TESTIMONIAL',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'author', 'STRING' ],
            [ 'role', 'STRING' ],
            [ 'company', 'STRING' ],
            [ 'text', 'STRING' ],
            [ 'imagePath', 'STRING' ]
        ]
        );

export const userTable
    = database.addTable(
          'USER',
          [
              [ 'id', 'TUID', [ 'key' ] ],
              [ 'pseudonym', 'STRING' ],
              [ 'firstName', 'STRING' ],
              [ 'lastName', 'STRING' ],
              [ 'email', 'STRING' ],
              [ 'password', 'STRING' ],
              [ 'secretQuestion', 'STRING' ],
              [ 'secretAnswer', 'STRING' ],
              [ 'provider', 'STRING' ],
              [ 'countrySlug', 'STRING' ],
              [ 'billingFirstAddressLine', 'STRING' ],
              [ 'billingSecondAddressLine', 'STRING' ],
              [ 'billingCity', 'STRING' ],
              [ 'billingCityCode', 'STRING' ],
              [ 'billingProvince', 'STRING' ],
              [ 'billingCountrySlug', 'STRING' ],
              [ 'firstPhonePrefix', 'STRING' ],
              [ 'firstPhoneNumber', 'STRING' ],
              [ 'secondPhonePrefix', 'STRING' ],
              [ 'secondPhoneNumber', 'STRING' ],
              [ 'role', 'STRING' ],
              [ 'cartInfo', 'STRING' ],
              [ 'dateTime', 'DATETIME' ],
            ]
          );

export const userSaveServiceTable
    = database.addTable(
        'USER_SAVE_SERVICE',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'userId', 'TUID' ],
            [ 'serviceId', 'TUID' ],
            [ 'dateTime', 'DATETIME' ]
        ]
        );

export const beneficiaryTable
    = database.addTable(
        'BENEFICIARY',
        [
            [ 'name', 'STRING' ],
            [ 'slug', 'STRING' ],
            [ 'account', 'STRING' ],
            [ 'bankName', 'STRING' ],
            [ 'bankCode', 'STRING' ]
        ]
        );

export const contactTable
    = database.addTable(
        'CONTACT',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'city', 'STRING' ],
            [ 'address', 'STRING' ],
            [ 'postCode', 'STRING' ],
            [ 'country', 'STRING' ],
            [ 'phoneNumber', 'STRING' ],
            [ 'email', 'STRING' ],
            [ 'directionLink', 'STRING' ]
        ]
        );

database.setDriver( new Mysql2Driver() );

await database.createConnectionPool(
    {
        host: process.env.MYSQLHOST ?? 'localhost',
        port: process.env.MYSQLPORT ?? 3306,
        user: process.env.MYSQLUSER ?? 'root',
        password: process.env.MYSQLPASSWORD ?? '',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
    );
