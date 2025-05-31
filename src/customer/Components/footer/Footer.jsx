import { Grid, Link, Typography } from '@mui/material';
import ClickableText from './ClickableText';

const Footer = () => {
  return (
    <Grid className='bg-black text-white mt-10 text-center' container sx={{ bgcolor: 'black', color: 'white', py: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Company
        </Typography>
        <ClickableText>About</ClickableText>
        <ClickableText>Blog</ClickableText>
        <ClickableText>Jobs</ClickableText>
        <ClickableText>Press</ClickableText>
        <ClickableText>Partners</ClickableText>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Solutions
        </Typography>
        <ClickableText>Marketing</ClickableText>
        <ClickableText>Analytics</ClickableText>
        <ClickableText>Commerce</ClickableText>
        <ClickableText>Insights</ClickableText>
        <ClickableText>Support</ClickableText>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Documentation
        </Typography>
        <ClickableText>Guides</ClickableText>
        <ClickableText>API Status</ClickableText>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Legal
        </Typography>
        <ClickableText>Claim</ClickableText>
        <ClickableText>Privacy</ClickableText>
        <ClickableText>Terms</ClickableText>
      </Grid>

      <Grid className='pt-20' item xs={12}>
        <Typography variant="body2" component="p" align="center">
          &copy; 2023 My Company. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Made with love by Me.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Icons made by{' '}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com/" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
