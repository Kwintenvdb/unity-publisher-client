import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        superagent.post('/api/authenticate')
            .send(data)
            .then(res => {
                console.log(res.body);
            });
    };

    return (
        <div>
            <p>Log in</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="email" type="email" ref={register} />
                <input name="password" type="password" ref={register} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Overview;
