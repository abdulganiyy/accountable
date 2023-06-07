import Head from "next/head";

const GoogleCalendarButton = () => {
  return (
    <>
      <Head>
        <link
          href="https://calendar.google.com/calendar/scheduling-button-script.css"
          rel="stylesheet"
        />
      </Head>
      <div id="calendar-scheduling-button" />
      <Head>
        <script
          src="https://calendar.google.com/calendar/scheduling-button-script.js"
          async
        />
      </Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            var target = document.getElementById('calendar-scheduling-button');
            window.addEventListener('load', function() {
              calendar.schedulingButton.load({
                url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ELrG1B2tSllvUJ9qGzqqUyW4x-LUf3qoFWRaloDmuIRdGSvBpV2tulu5cXpEp7BlKIydJ5I-j?gv=true',
                color: '#039BE5',
                label: 'Book an appointment',
                target,
              });
            });
          })();
        `,
        }}
      />
    </>
  );
};

export default GoogleCalendarButton;
