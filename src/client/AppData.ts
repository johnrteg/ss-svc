//
//
//

//
//import { Endpoint }                 from "microvolt-lib/lib/services/Endpoint.js";
//import ObjectUtils                  from "microvolt-lib/lib/utils/ObjectUtils.js";
import { getLayoutEndpoint } from '../api/getLayoutEndpoint.js';
import { netClient }          from '../net/netClient.js';
import { Constants } from '../utils/Constants.js';
import { Interfaces } from './Interfaces.js';


export enum Cache
{
    //APP      = "app",
    //APPS     = "apps",
    //PACKAGES = "packages",
    //CLIENTS  = "clients",
    //COUPONS  = "coupons",
    //ACCESS   = "access",
    //TIMEOUT   = "timeout",
}

interface BrowserConfig
{
    host : string;
}


//
//
//
export default class AppData
{
    private static _instance : AppData;

    private config : BrowserConfig;

    public webserver    : netClient;

    //public localizer : Localizer;
    public layout : Interfaces.Layout;

    public begin_window : number = 6; // hours
    public end_window   : number = 22; // hours

    ////////////////////////////////////////////////////////////////////////////////////////////////
    constructor()
    {
        //this.localizer  = new Localizer();
        //this.cache      = new CacheData();
        this.config = { host: "http://localhost:8080" };
        this.layout = { pages: [] };
    
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    public async clear() : Promise<void>
    {
        //this.webserver.clear();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    public static instance() : AppData
    {
        if( AppData._instance == null )
        {
            AppData._instance = new AppData();
        }
        return AppData._instance;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    public nextUpdate( tm : number ) : number
    {
        const now : Date = new Date();
        // use given if within window to update
        // else next update at the start of the window, less 1 hour
        return ( now.getHours() >= this.begin_window && now.getHours() <= this.end_window ) ? tm : ( 24 - now.getHours() + this.begin_window - 1 )*Constants.HOURS_TO_MS;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    public async initialize( main : Function ) : Promise<void>
    {
        //this.uri = new Uri( window.location.hash );

        //console.log('initialize', this.uri );

        /*
        // load browser config
        const client : microvoltClient = new microvoltClient('/');
        const reply  : microvoltClient.Reply = await client.get( "data/browser/config.json" );
        if( reply.ok )
        {
            //console.info( "browser config", reply.data );
            this.config = reply.data;
        }
        */

        // client service
        let headers : any = {};

        this.webserver = new netClient( this.config.host, headers );

        //
        const endpt : getLayoutEndpoint = new getLayoutEndpoint();
        const init_reply  : netClient.Reply = await this.webserver.fetch( endpt );
        if( init_reply.ok )
        {
            
            //this.keys.editor = init_reply.data.editor;
            this.layout = init_reply.data.layout;

            //console.info( "init layout", this.layout );
        }

        //await this.localizer.init();

        // start the app
        main();
    }

}

// eof
