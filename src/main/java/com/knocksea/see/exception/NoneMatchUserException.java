package com.knocksea.see.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NoneMatchUserException extends RuntimeException{
    public NoneMatchUserException(String message) {
        super(message);
    }
}
